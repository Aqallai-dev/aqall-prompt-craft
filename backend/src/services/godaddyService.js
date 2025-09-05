import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export class GoDaddyService {
  constructor() {
    this.apiKey = process.env.GODADDY_API_KEY;
    this.apiSecret = process.env.GODADDY_API_SECRET;
    this.domain = process.env.GODADDY_DOMAIN || 'aqall.dev';
    this.baseUrl = 'https://api.godaddy.com/v1';
  }

  async makeRequest(endpoint, method = 'GET', data = null) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const options = {
      method,
      headers: {
        'Authorization': `sso-key ${this.apiKey}:${this.apiSecret}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }

    try {
      console.log(`Making ${method} request to: ${url}`);
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GoDaddy API Error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GoDaddy API Request failed:', error);
      throw error;
    }
  }

  async getDNSRecords() {
    try {
      console.log('Fetching DNS records from GoDaddy');
      const records = await this.makeRequest(`/domains/${this.domain}/records`);
      console.log(`Fetched ${records.length} DNS records`);
      return records;
    } catch (error) {
      console.error('Error fetching DNS records:', error);
      throw error;
    }
  }

  async checkSubdomainExists(subdomain) {
    try {
      const records = await this.getDNSRecords();
      const aRecords = records.filter(record => record.type === 'A');
      const exists = aRecords.some(record => record.name === subdomain);
      console.log(`Subdomain ${subdomain} exists: ${exists}`);
      return exists;
    } catch (error) {
      console.error('Error checking subdomain:', error);
      return false;
    }
  }

  async createSubdomain(subdomain, ip) {
    try {
      console.log(`Creating subdomain: ${subdomain}.${this.domain} pointing to ${ip}`);
      
      // Check if subdomain already exists
      const existingRecords = await this.getDNSRecords();
      const existingRecord = existingRecords.find(record => 
        record.name === subdomain && record.type === 'A'
      );

      if (existingRecord) {
        console.log(`Subdomain ${subdomain} already exists, updating...`);
        // Update existing record
        await this.makeRequest(
          `/domains/${this.domain}/records/A/${subdomain}`,
          'PUT',
          [{
            data: ip,
            ttl: 3600
          }]
        );
      } else {
        console.log(`Creating new subdomain: ${subdomain}.${this.domain}`);
        // Create new A record
        await this.makeRequest(
          `/domains/${this.domain}/records`,
          'PATCH',
          [{
            type: 'A',
            name: subdomain,
            data: ip,
            ttl: 3600
          }]
        );
      }
      
      console.log(`✅ Successfully created/updated subdomain: ${subdomain}.${this.domain}`);
      return { 
        success: true, 
        subdomain: `${subdomain}.${this.domain}`,
        ip: ip
      };
    } catch (error) {
      console.error('Error creating subdomain:', error);
      throw error;
    }
  }

  async deleteSubdomain(subdomain) {
    try {
      console.log(`Deleting subdomain: ${subdomain}.${this.domain}`);
      
      await this.makeRequest(
        `/domains/${this.domain}/records/A/${subdomain}`,
        'DELETE'
      );
      
      console.log(`✅ Successfully deleted subdomain: ${subdomain}.${this.domain}`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting subdomain:', error);
      throw error;
    }
  }
}
