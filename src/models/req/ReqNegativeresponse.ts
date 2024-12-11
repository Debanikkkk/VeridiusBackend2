export interface ReqNegativeResponseCode {
  id?: number; // Optional for update operations
  responseCode?: string; // Response code of the negative response
  description?: string; // Description of the negative response
  ecuIds?: number[]; // Array of associated ECU IDs
}
