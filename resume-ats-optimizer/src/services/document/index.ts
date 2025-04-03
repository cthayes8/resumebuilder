import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';

/**
 * Service for processing and extracting text from different document types
 */
export class DocumentService {
  /**
   * Extract text from a document file
   */
  async extractTextFromFile(file: File): Promise<string> {
    try {
      const fileType = this.getFileExtension(file.name);
      
      switch (fileType) {
        case 'pdf':
          return this.extractTextFromPDF(file);
        case 'docx':
          return this.extractTextFromDOCX(file);
        default:
          throw new Error(`Unsupported file type: ${fileType}`);
      }
    } catch (error) {
      console.error('Error extracting text from file:', error);
      throw new Error(`Failed to extract text: ${error.message}`);
    }
  }
  
  /**
   * Extract text from a PDF file
   */
  private async extractTextFromPDF(file: File): Promise<string> {
    try {
      const buffer = await file.arrayBuffer();
      const data = await pdfParse(new Uint8Array(buffer));
      return data.text;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }
  
  /**
   * Extract text from a DOCX file
   */
  private async extractTextFromDOCX(file: File): Promise<string> {
    try {
      const buffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({
        arrayBuffer: buffer
      });
      return result.value;
    } catch (error) {
      console.error('Error extracting text from DOCX:', error);
      throw new Error(`Failed to extract text from DOCX: ${error.message}`);
    }
  }
  
  /**
   * Get file extension from filename
   */
  private getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  }
}

export default new DocumentService(); 