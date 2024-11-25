import { MigrationInterface, QueryRunner } from 'typeorm';

export class BannerData1732510373440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO banners (
                product_name, product_tag, product_img, product_description, product_link, rating, priority
            ) VALUES 
            (
                'Communica WI', 
                'https://navigolabs.com/images/mefsCommunica.png', 
                'https://example.com/img1.jpg', 
                'Communica WI\nOverview: Communica WI is a versatile diagnostic and flashing tool designed to work with both Wi-Fi and Bluetooth Low Energy (BLE) networks. It is suitable for use with vehicles that operate on either 12V or 24V power systems.\nAlias: VCI (Vehicle Communication Interface) / CWI (Communica Wi-Fi Interface) - compatible with OBD-II protocols.\nConnectivity:\nNetwork: Supports Wi-Fi and BLE for communication and data transfer.\nFunctionality:\nDiagnostics: Utilizes Wi-Fi/BLE for vehicle diagnostics, allowing for real-time monitoring and analysis of vehicle systems.\nFlashing: Supports firmware flashing and updates.',
                'https://navigolabs.com/#',
                0.0, 
                1
            ),
            (
                'Navimatics', 
                'https://navigolabs.com/images/Navio.jpeg', 
                'https://example.com/img2.jpg', 
                'Navimatics\nOverview: Navimatics is a cutting-edge telematics device that provides comprehensive solutions for vehicle telematics, diagnostics, and ECU flashing. It is certified and compliant with AIS140 standards.\nKey Features:\nDiagnostics: Offers advanced diagnostic capabilities for real-time monitoring and analysis of vehicle systems.\nIO Integration: Seamlessly integrates with various Input/Output systems for enhanced functionality.\nTelematics: Provides robust telematics services, including data collection, vehicle tracking, and communication.\nECU Flashing: Supports ECU flashing and updates, ensuring vehicles run on the latest firmware.\nAIS140 Compliance: Fully compliant with AIS140 standards, integrating with the Vahan Portal and supporting GNSS tolling.\nConnectivity:\nConnector:\n23 Pin (ECU)\n16 Pin (OBD II)\nBoth connectors are AIS certified, ensuring compatibility and reliability.\nModules:\nEC600U + L89: Equipped with these modules to deliver high-performance diagnostics and telematics services.',
                'https://navigolabs.com/#',
                0.0, 
                2
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        delete from banners;
        `);
  }
}
