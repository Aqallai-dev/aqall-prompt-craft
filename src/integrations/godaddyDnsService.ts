export class GoDaddyDNSService {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl = 'https://api.godaddy.com/v1';
  private domain = 'aqall.dev';

  constructor() {
    // Use import.meta.env for Vite instead of process.env
    this.apiKey = import.meta.env.VITE_GODADDY_API_KEY || '';
    this.apiSecret = import.meta.env.VITE_GODADDY_API_SECRET || '';
    
    // Debug: Log environment variables
    console.log('GoDaddy DNS Service initialized with:');
    console.log('API Key:', this.apiKey ? 'Set' : 'Not set');
    console.log('API Secret:', this.apiSecret ? 'Set' : 'Not set');
  }

  private async makeRequest(endpoint: string, method: string = 'GET', data?: any) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const options: RequestInit = {
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

  async createSubdomain(subdomain: string, ip: string) {
    try {
      console.log('Creating subdomain with IP:', ip);
      console.log('Environment variable VITE_HOSTING_SERVER_IP:', import.meta.env.VITE_HOSTING_SERVER_IP);
      
      if (!this.apiKey || !this.apiSecret) {
        throw new Error('GoDaddy API credentials not configured');
      }

      // Check if subdomain already exists
      const existingRecords = await this.getDNSRecords();
      const existingRecord = existingRecords.find((record: any) => 
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
        console.log(`Creating new subdomain: ${subdomain}.aqall.dev pointing to ${ip}`);
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
      
      console.log(`Successfully created/updated subdomain: ${subdomain}.aqall.dev`);
      return { success: true, subdomain: `${subdomain}.aqall.dev` };
    } catch (error) {
      console.error('Error creating subdomain:', error);
      throw error;
    }
  }

  async deleteSubdomain(subdomain: string) {
    try {
      console.log(`Deleting subdomain: ${subdomain}.aqall.dev`);
      
      if (!this.apiKey || !this.apiSecret) {
        throw new Error('GoDaddy API credentials not configured');
      }

      // Delete the A record
      await this.makeRequest(
        `/domains/${this.domain}/records/A/${subdomain}`,
        'DELETE'
      );
      
      console.log(`Successfully deleted subdomain: ${subdomain}.aqall.dev`);
      return { success: true };
    } catch (error) {
      console.error('Error deleting subdomain:', error);
      throw error;
    }
  }

  async getDNSRecords() {
    try {
      console.log('Fetching DNS records from GoDaddy');
      
      if (!this.apiKey || !this.apiSecret) {
        console.log('GoDaddy API credentials not configured, returning empty array');
        return [];
      }

      const records = await this.makeRequest(`/domains/${this.domain}/records`);
      console.log('Fetched DNS records:', records.length);
      return records;
    } catch (error) {
      console.error('Error fetching DNS records:', error);
      return []; // Return empty array on error
    }
  }

  async checkSubdomainExists(subdomain: string) {
    try {
      const records = await this.getDNSRecords();
      const aRecords = records.filter((record: any) => record.type === 'A');
      const exists = aRecords.some((record: any) => record.name === subdomain);
      console.log(`Subdomain ${subdomain} exists: ${exists}`);
      return exists;
    } catch (error) {
      console.error('Error checking subdomain:', error);
      return false; // Return false on error so subdomain appears available
    }
  }
}