import { StaticConfig } from "@renderer/app/config/config";
import { Logout } from "@renderer/components/utils/Logout";
import { SalesModel } from "../model/Model";

type ModelType = SalesModel

export class SalesService {
  private apiUrl: string = 'http://localhost:5167/Sale';

  constructor() { }

  public async getAll(): Promise<ModelType[]> {
    try {
      const response = await fetch(`${this.apiUrl}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem(StaticConfig.authTokenKeyString)}`
          }
        });
      if (response.status === 401) Logout()
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const list: ModelType[] = await response.json();
      return list;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  public async getById(id: number): Promise<ModelType | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(StaticConfig.authTokenKeyString)}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const entry: ModelType = await response.json();
      return entry;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  public async create(data: ModelType): Promise<ModelType | null> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem(StaticConfig.authTokenKeyString)}`
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newEntry: ModelType = await response.json();
      return newEntry;
    } catch (error) {
      console.error('Error creating:', error);
      return null;
    }
  }

  public async update(id: number, entry: ModelType): Promise<ModelType | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem(StaticConfig.authTokenKeyString)}`
        },
        body: JSON.stringify(entry),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedEntry: ModelType = await response.json();
      return updatedEntry;
    } catch (error) {
      console.error('Error updating:', error);
      return null;
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(StaticConfig.authTokenKeyString)}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error('Error deleting:', error);
      return false;
    }
  }
  public async filter(filters: Record<string, string>): Promise<ModelType[]> {
    const queryString = Object.keys(filters)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
      .join('&');
    const filterUrl = `${this.apiUrl}/filter?${queryString}`;

    try {
      const response = await fetch(filterUrl, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(StaticConfig.authTokenKeyString)}`
        }
      });
      if (response.status === 401) Logout();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const list: ModelType[] = await response.json();
      return list;
    } catch (error) {
      console.error('Error filtering data:', error);
      return [];
    }
  }
}