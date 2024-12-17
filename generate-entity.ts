import * as oracledb from 'oracledb';
import * as fs from 'fs';

async function generateEntity(tableName: string) {
  try {
    const connection = await oracledb.getConnection({
      user: 'EMPRESA_01',
      password: '1DrallN3w23',
      connectString: 'srv-data:1521/idrallpdb1.db.net',
    });

    // Get all columns with additional metadata
    const columnsResult = await connection.execute(
      `
      SELECT column_name, data_type, data_length, nullable, 
             data_precision, data_scale
      FROM all_tab_columns
      WHERE table_name = :tableName
      AND owner = 'EMPRESA_01'
      `,
      [tableName],
    );

    const pkResult = await connection.execute(
      `
      SELECT cols.column_name
      FROM all_constraints cons, all_cons_columns cols
      WHERE cons.constraint_type = 'P'
      AND cons.constraint_name = cols.constraint_name
      AND cons.owner = cols.owner
      AND cols.table_name = :tableName
      AND cons.owner = 'EMPRESA_01'
      `,
      [tableName],
    );

    const primaryKeys = new Set(pkResult.rows.map((row: any) => row[0]));

    let entityContent = `import { Entity, Column, PrimaryColumn } from 'typeorm';\n\n`;
    entityContent += `@Entity('${tableName}')\n`;
    entityContent += `export class ${tableName} {\n`;

    columnsResult.rows.forEach((row: any) => {
      const columnName = row[0];
      const dataType = row[1];
      const nullable = row[3] === 'Y';
      const isPrimaryKey = primaryKeys.has(columnName);
      const decorator = isPrimaryKey ? '@PrimaryColumn' : '@Column';

      // Handle specific column types
      if (dataType === 'CLOB' && columnName.toLowerCase().includes('json')) {
        // For JSON stored in CLOB
        entityContent += `  ${decorator}({\n`;
        entityContent += `    name: '${columnName}',\n`;
        entityContent += `    type: 'clob',\n`;
        entityContent += `    nullable: ${nullable},\n`;
        entityContent += `    transformer: {\n`;
        entityContent += `      from: (value: string) => value ? JSON.parse(value) : null,\n`;
        entityContent += `      to: (value: any) => value ? JSON.stringify(value) : null\n`;
        entityContent += `    }\n`;
        entityContent += `  })\n`;
        entityContent += `  ${columnName.toLowerCase()}: any;\n\n`;
      } else {
        // Handle standard columns
        const columnOptions = [];
        columnOptions.push(`name: '${columnName}'`);

        if (!isPrimaryKey && nullable) {
          columnOptions.push('nullable: true');
        }

        // Add type for specific data types that need it
        if (dataType === 'NUMBER' && row[4] !== null) {
          // If precision is specified
          columnOptions.push(`type: 'number'`);
          columnOptions.push(`precision: ${row[4]}`);
          if (row[5] !== null) {
            // If scale is specified
            columnOptions.push(`scale: ${row[5]}`);
          }
        }

        entityContent += `  ${decorator}({ ${columnOptions.join(', ')} })\n`;
        entityContent += `  ${columnName.toLowerCase()}: ${mapOracleTypeToTS(dataType)};\n\n`;
      }
    });

    entityContent += `}\n`;

    const dir = './src/entities';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(
      `${dir}/${tableName.toLowerCase()}.entity.ts`,
      entityContent,
    );

    console.log(`Entity generated successfully for table: ${tableName}`);
    await connection.close();
  } catch (err) {
    console.error('Error generating entity:', err);
  }
}

function mapOracleTypeToTS(oracleType: string): string {
  const typeMap: { [key: string]: string } = {
    VARCHAR2: 'string',
    NUMBER: 'number',
    DATE: 'Date',
    TIMESTAMP: 'Date',
    CHAR: 'string',
    CLOB: 'string',
    BLOB: 'Buffer',
    FLOAT: 'number',
    INTEGER: 'number',
    DECIMAL: 'number',
    RAW: 'Buffer',
    LONG: 'string',
    NVARCHAR2: 'string',
    NCHAR: 'string',
    BINARY_FLOAT: 'number',
    BINARY_DOUBLE: 'number',
  };

  return typeMap[oracleType] || 'any';
}

generateEntity('CLIENTE');
