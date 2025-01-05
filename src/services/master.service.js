import { API_URL, handleResponse, handleError } from './config';
import axios from 'axios';

export const getRoles = async (token) => {
  try {
    const response = await fetch(`${API_URL}/roles`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getDepartments = async (token) => {
  try {
    const response = await fetch(`${API_URL}/departments`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getAssets = async (token) => {
  try {
    console.log('Fetching assets from:', `${API_URL}/assets`);
    console.log('Using token:', token);
    
    const response = await fetch(`${API_URL}/assets`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log('Response status:', response.status);
    const data = await handleResponse(response);
    console.log('Raw API response:', JSON.stringify(data, null, 2));
    
    // Ensure data is always an array
    const assets = Array.isArray(data) ? data : data.assets || [data] || [];
    console.log('Processed assets array:', JSON.stringify(assets, null, 2));
    
    // Calculate total cost safely
    const totalCost = assets.reduce((sum, asset) => {
      const cost = parseFloat(asset.cost) || 0;
      return sum + cost;
    }, 0);
    
    const result = {
      assets: assets.map(asset => ({
        ...asset,
        cost: parseFloat(asset.cost) || 0,
        supplier_id: asset.supplier_id || { name: '-' },
        category_id: asset.category_id || { name: '-' },
        status_id: asset.status_id || { name: '-' },
        condition_id: asset.condition_id || { name: '-' }
      })),
      total: assets.length,
      totalCost: totalCost
    };
    
    console.log('Final transformed result:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Asset fetch error details:', error);
    return handleError(error);
  }
}; 