// document.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private static instance: DocumentService;
  private documents: any[] = [];

  private constructor() {}

  static getInstance(): DocumentService {
    if (!DocumentService.instance) {
      DocumentService.instance = new DocumentService();
    }
    return DocumentService.instance;
  }

  addDocument(document: any) {
    this.documents.push({ state: 'pending', document: document });
  }

  acceptDocument(document: any) {
    document.state = 'accepted';
    // Puedes agregar lógica adicional para mover el documento a otra lista
  }

  getDocumentsByState(state: string): any[] {
    return this.documents.filter((doc) => doc.state === state);
  }
}
