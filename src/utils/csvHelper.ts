// import { parse } from 'csv-parse';
// import { Readable } from 'stream';

// interface DongleCSV {
//   dongle_serial_number?: string;
//   mac_address?: string;
//   manufacture_date?: Date;
//   firmware_version?: string;
// }

// export const parseCSV = async (csvContent: Buffer): Promise<DongleCSV[]> => {
//   return new Promise((resolve, reject) => {
//     const records: DongleCSV[] = [];
//     const stream = Readable.from(csvContent);
//     const parser = parse({ columns: true, skipEmptyLines: true });

//     stream.pipe(parser);

//     parser.on('data', (row) => {
//       records.push({
//         dongle_serial_number: row.dongle_serial_number,
//         mac_address: row.mac_address,
//         manufacture_date: row.manufacture_date ? new Date(row.manufacture_date) : undefined,
//         firmware_version: row.firmware_version,
//       });
//     });

//     parser.on('end', () => resolve(records));
//     parser.on('error', (err) => reject(err));
//   });
// };
