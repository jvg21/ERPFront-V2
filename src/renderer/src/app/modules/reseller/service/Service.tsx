import { ResselerModel } from "../model/Model";

type ModelType = ResselerModel

export class ReselerService{
    private apiUrl: string = 'http://localhost:5167/Reseller';

    constructor(){}

    public async getAll(): Promise<ModelType[]> {
        try {
          const response = await fetch(`${this.apiUrl}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const list: ModelType[] = await response.json();
          return list;
        } catch (error) {
          console.error('Error fetching cars data:', error);
          // Aqui você poderia optar por tratar o erro de forma diferente ou mesmo relançá-lo.
          return [];
        }
      }

      public async getById(id: number): Promise<ModelType | null> {
        try {
          const response = await fetch(`${this.apiUrl}/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const entry: ModelType = await response.json();
          return entry;
        } catch (error) {
          console.error('Error fetching car data:', error);
          return null;
        }
      }
    
      public async create(data: ModelType): Promise<ModelType | null> {
        try {
          const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const newEntry: ModelType = await response.json();
          return newEntry;
        } catch (error) {
          console.error('Error creating car:', error);
          return null;
        }
      }
    
      public async update(id: number, entry: ModelType): Promise<ModelType | null> {
        try {
          const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
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


    
}