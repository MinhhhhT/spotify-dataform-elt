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


module.exports = { 
    generate_sk, 
    get_current_datetime, 
    get_batch_id, 
    to_vn_timestamp
};