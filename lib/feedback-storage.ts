import { promises as fs } from "fs";
import path from "path";

export interface Feedback {
  id: string;
  name: string;
  email: string;
  feedback: string;
  rating: number;
  createdAt: string;
}

class FeedbackStorage {
  private static instance: FeedbackStorage;
  private filePath: string;

  private constructor() {
    this.filePath = path.join(process.cwd(), "data", "feedback.json");
  }

  public static getInstance(): FeedbackStorage {
    if (!FeedbackStorage.instance) {
      FeedbackStorage.instance = new FeedbackStorage();
    }
    return FeedbackStorage.instance;
  }

  private async ensureDataDirectory(): Promise<void> {
    const dataDir = path.dirname(this.filePath);
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }
  }

  private async readFromFile(): Promise<Feedback[]> {
    try {
      await this.ensureDataDirectory();
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async writeToFile(data: Feedback[]): Promise<void> {
    await this.ensureDataDirectory();
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  public async getAll(): Promise<Feedback[]> {
    return await this.readFromFile();
  }

  public async add(feedback: Feedback): Promise<void> {
    const data = await this.readFromFile();
    data.push(feedback);
    await this.writeToFile(data);
  }

  public async findById(id: string): Promise<Feedback | undefined> {
    const data = await this.readFromFile();
    return data.find((item) => item.id === id);
  }

  public async updateById(
    id: string,
    updates: Partial<Feedback>
  ): Promise<Feedback | null> {
    const data = await this.readFromFile();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) return null;

    data[index] = { ...data[index], ...updates };
    await this.writeToFile(data);
    return data[index];
  }

  public async deleteById(id: string): Promise<boolean> {
    const data = await this.readFromFile();
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) return false;

    data.splice(index, 1);
    await this.writeToFile(data);
    return true;
  }

  public async getLength(): Promise<number> {
    const data = await this.readFromFile();
    return data.length;
  }

  public async getAllIds(): Promise<string[]> {
    const data = await this.readFromFile();
    return data.map((item) => item.id);
  }
}

export const feedbackStorage = FeedbackStorage.getInstance();
