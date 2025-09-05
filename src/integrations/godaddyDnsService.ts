export class GoDaddyDNSService {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl = 'http://localhost:3001/api/dns';
  private domain = 'aqall.dev';

  constructor() {
    // Use import.meta.env for Vite instead of process.env
    this.apiKey = import.meta.env.VITE_GODADDY_API_KEY || '';
    this.apiSecret = import.meta.env.VITE_GODADDY_API_SECRET || '';
    
    // Debug: Log environment variables
    console.log('GoDaddy DNS Service initialized with:');
    console.log('API Key:', this.apiKey ? 'Set' : 'Not set');
    console.log('API Secret:', this.apiSecret ? 'Set' : 'Not set');
    console.log('Backend API:', this.baseUrl);
  }

  private async makeRequest(endpoint: string, method: string = 'GET', data?: any) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const options: RequestInit = {
      method,
      headers: {
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
        throw new Error(`Backend API Error: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Backend API Request failed:', error);
      throw error;
    }
  }

  async createSubdomain(subdomain: string, ip: string) {
    try {
      console.log('Creating subdomain with IP:', ip);
      console.log('Environment variable VITE_HOSTING_SERVER_IP:', import.meta.env.VITE_HOSTING_SERVER_IP);
      
      const result = await this.makeRequest('/create', 'POST', {
        subdomain,
        ip
      });
      
      console.log(`✅ Successfully created subdomain: ${result.subdomain}`);
      return result;
    } catch (error) {
      console.error('Error creating subdomain:', error);
      throw error;
    }
  }

  async deleteSubdomain(subdomain: string) {
    try {
      console.log(`Deleting subdomain: ${subdomain}.aqall.dev`);
      
      const result = await this.makeRequest(`/${subdomain}`, 'DELETE');
      
      console.log(`✅ Successfully deleted subdomain: ${subdomain}.aqall.dev`);
      return result;
    } catch (error) {
      console.error('Error deleting subdomain:', error);
      throw error;
    }
  }

  async getDNSRecords() {
    try {
      console.log('Fetching DNS records from backend API');
      
      const result = await this.makeRequest('/records');
      console.log(`Fetched ${result.records.length} DNS records`);
      return result.records;
    } catch (error) {
      console.error('Error fetching DNS records:', error);
      return []; // Return empty array on error
    }
  }

  async checkSubdomainExists(subdomain: string) {
    try {
      const result = await this.makeRequest(`/check/${subdomain}`);
      console.log(`Subdomain ${subdomain} exists: ${result.exists}`);
      return result.exists;
    } catch (error) {
      console.error('Error checking subdomain:', error);
      return false; // Return false on error so subdomain appears available
    }
  }
}