import express from 'express';
import { GoDaddyService } from '../services/godaddyService.js';

const router = express.Router();
const godaddyService = new GoDaddyService();

// Get all DNS records
router.get('/records', async (req, res) => {
  try {
    const records = await godaddyService.getDNSRecords();
    res.json({ success: true, records });
  } catch (error) {
    console.error('Error fetching DNS records:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch DNS records',
      message: error.message 
    });
  }
});

// Check if subdomain exists
router.get('/check/:subdomain', async (req, res) => {
  try {
    const { subdomain } = req.params;
    const exists = await godaddyService.checkSubdomainExists(subdomain);
    res.json({ success: true, exists });
  } catch (error) {
    console.error('Error checking subdomain:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to check subdomain',
      message: error.message 
    });
  }
});

// Create subdomain
router.post('/create', async (req, res) => {
  try {
    const { subdomain, ip } = req.body;
    
    if (!subdomain || !ip) {
      return res.status(400).json({ 
        success: false, 
        error: 'Subdomain and IP are required' 
      });
    }

    const result = await godaddyService.createSubdomain(subdomain, ip);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error('Error creating subdomain:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create subdomain',
      message: error.message 
    });
  }
});

// Delete subdomain
router.delete('/:subdomain', async (req, res) => {
  try {
    const { subdomain } = req.params;
    const result = await godaddyService.deleteSubdomain(subdomain);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error('Error deleting subdomain:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete subdomain',
      message: error.message 
    });
  }
});

export default router;
