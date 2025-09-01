export class GoDaddyDNSService {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl = 'https://api.godaddy.com/v1';

  constructor() {
    // Use import.meta.env for Vite instead of process.env
    this.apiKey = import.meta.env.VITE_GODADDY_API_KEY || '';
    this.apiSecret = import.meta.env.VITE_GODADDY_API_SECRET || '';
  }

  async createSubdomain(subdomain: string, ip: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/domains/aqall.dev/records/A/${subdomain}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `sso-key ${this.apiKey}:${this.apiSecret}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([{
            data: ip,
            ttl: 3600
          }]),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`GoDaddy API error: ${error}`);
      }

      return { success: true, subdomain: `${subdomain}.aqall.dev` };
    } catch (error) {
      console.error('Error creating subdomain:', error);
      throw error;
    }
  }

  async deleteSubdomain(subdomain: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/domains/aqall.dev/records/A/${subdomain}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `sso-key ${this.apiKey}:${this.apiSecret}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`GoDaddy API error: ${error}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting subdomain:', error);
      throw error;
    }
  }

  async getDNSRecords() {
    try {
      const response = await fetch(
        `${this.baseUrl}/domains/aqall.dev/records`,
        {
          headers: {
            'Authorization': `sso-key ${this.apiKey}:${this.apiSecret}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`GoDaddy API error: ${error}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching DNS records:', error);
      throw error;
    }
  }

  async checkSubdomainExists(subdomain: string) {
    try {
      const records = await this.getDNSRecords();
      const aRecords = records.filter((record: any) => record.type === 'A');
      return aRecords.some((record: any) => record.name === subdomain);
    } catch (error) {
      console.error('Error checking subdomain:', error);
      return false;
    }
  }
}
