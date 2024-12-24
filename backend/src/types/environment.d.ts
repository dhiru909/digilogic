declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      PORT: string;
      NODE_ENV: 'development' | 'production' | 'test';
      ARCJET_KEY:string;
      ARCJET_ENV:string;
      JWT_SECRET:string;
    }
  }
}

export {};