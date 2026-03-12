function get_batch_id() {
  return `CAST(FORMAT_TIMESTAMP('%Y%m%d%H', CURRENT_TIMESTAMP(), 'Asia/Ho_Chi_Minh') AS INT64)`;
}

function generate_sk(column_name) {
  return `FARM_FINGERPRINT(CAST(${column_name} AS STRING))`;
}

function get_current_datetime() {
  return `DATETIME_TRUNC(CURRENT_DATETIME('Asia/Ho_Chi_Minh'), MINUTE)`;
}

function to_vn_timestamp(column_name) {
  return `DATETIME(${column_name}, 'Asia/Ho_Chi_Minh')`;
}

function generate_validation_sql(table_name, rules) {
    /** 
     * Generate a SQL expression to validate a set of data quality rules.
     * 
     * @param {string} table_name: The name of the table to validate.
     * @param {Array<Object>} rules: An array of data quality rule objects.
     * @returns {string} A SQL expression that returns a validation status and a list of failed rules. 
    */

    const validation_cases = rules.map(rule => `WHEN NOT (${rule.expression}) THEN '${rule.name}'`);

    return `
        SELECT 
            *, 
            CASE 
                ${validation_cases.join('\n  ')}
                ELSE 'VALID'
            END AS validation_status, 
            ARRAY_CONCAT(
                ${rules.map(rule => `CASE WHEN NOT (${rule.expression}) THEN ['${rule.name}'] ELSE [] END`).join(',\n   ')}
            ) AS failed_rules
        FROM ${table_name}
    `;
}


module.exports = { 
    generate_sk, 
    get_current_datetime, 
    get_batch_id, 
    to_vn_timestamp, 
    generate_validation_sql
};