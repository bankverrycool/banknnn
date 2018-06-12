var errorMessage = {
    // Database 10+000
  'err_database': { 'success': false, 'error_code': '10001', 'error_message': 'There Was a Problem in Database.' },

    // Validation 20+000
  'err_required_token': { 'success': false, 'error_code': '20001', 'error_message': 'authorization is Required in Header.' },
  'err_required_fingerprint_token': { 'success': false, 'error_code': '20001', 'error_message': 'Fingerprint token not found.' },
  'err_basic_auth': { 'success': false, 'error_code': '20002', 'error_message': 'Basic Authentication Failed.' },
  'err_wrong_password': { 'success': false, 'error_code': '20003', 'error_message': 'ลงชื่อเข้าใช้ผิดพลาด ชื่อผู้ใช้หรือรหัสผ่านผิด' },
  'err_wrong_password_change': { 'success': false, 'error_code': '20003', 'error_message': 'รหัสผ่านเก่าไม่ถูกต้อง' },
  'err_pin_confirm_wrong': { 'success': false, 'error_code': '20004', 'error_message': 'Authentication Failed. Wrong Pincode.' },
  'err_no_permission': { 'success': false, 'error_code': '20005', 'error_message': 'Authentication Failed. No Permission to Access' },
  'err_invalid_citizenId': { 'success': false, 'error_code': '20006', 'error_message': 'Citizen ID is invalid' },
  'err_otp_expire': { 'success': false, 'error_code': '20007', 'error_message': 'Verify Failed. OTP Expire.' },
  'err_otp_status': { 'success': false, 'error_code': '20008', 'error_message': 'Verify Failed. OTP is Wrong.' },
  'err_token_reset_pin_status': { 'success': false, 'error_code': '20009', 'error_message': 'Verify Failed. token reset pin is Wrong.' },
  'err_more_then_balance': { 'success': false, 'error_code': '20010', 'error_message': 'Your Balance is Not Enough.' },
  'err_less_then_zero': { 'success': false, 'error_code': '20011', 'error_message': 'Please enter amount more then 1.0 THB.' },
  'err_wrong_login': { 'success': false, 'error_code': '20012', 'error_message': 'Wrong login. Please reset password.' },
  'err_user_unverify': { 'success': false, 'error_code': '20013', 'error_message': 'User is not verify. Please verify user or Reset pin.' },
  'err_validate_developer': { 'success': false, 'error_code': '20014', 'error_message': 'Developer validation failed. Please check developer_id, api_key, or secret_key.' },
  'err_user_not_transfer_to_you': { 'success': false, 'error_code': '200154', 'error_message': 'Authentication Failed. You Can Not Transfer Money To Your Wallet.' },
  'err_cannot_save_product_image': { 'success': false, 'error_code': '200166', 'error_message': 'Error, cannot save product image.' },
  'err_required_announce_id': { 'success': false, 'error_code': '20001', 'error_message': 'Announce ID  not found.' },

    // Token 30+000
  'err_token_expire': { 'success': false, 'error_code': '30001', 'error_message': 'Authentication Failed. Token Expire.' },
  'err_token_fingerprint_expire': { 'success': false, 'error_code': '30002', 'error_message': 'Authentication Failed. Token Fingerprint Expire.' },

    // Not found 40+000
  'err_user_not_found': { 'success': false, 'error_code': '40001', 'error_message': 'ลงชื่อเข้าใช้ผิดพลาด ไม่พบชื่อผู้ใช้นี้' },
  'err_service_not_found': {'success': false, 'error_code': '40002', 'error_message': 'Service Not Found.'},
  'err_work_not_found': { 'success': false, 'error_code': '4003', 'error_message': 'Job not found.' },
  'user_work_not_found': { 'success': false, 'error_code': '4003', 'error_message': 'User not found.' },

    // Already 50+000
  'err_data_already': { 'success': false, 'error_code': '50001', 'error_message': 'Email, Mobile No, or Citizen ID is Already.' },
  'err_user_already': { 'success': false, 'error_code': '50002', 'error_message': 'User already' },
  'err_user_invalid': { 'success': false, 'error_code': '50002', 'error_message': 'User Invalid' },
  'err_department_already': { 'success': false, 'error_code': '50002', 'error_message': 'Department already' },
  'err_wallet_already': { 'success': false, 'error_code': '50003', 'error_message': 'Wallet already' },
  'err_email_already': { 'success': false, 'error_code': '50004', 'error_message': 'Email already.' },
  'err_category_already': { 'success': false, 'error_code': '50005', 'error_message': 'Category name is already had.' },
  'err_product_already': { 'success': false, 'error_code': '50006', 'error_message': 'Product name is already had.' },
  'err_promotion_already': { 'success': false, 'error_code': '50007', 'error_message': 'Promotion name is already had.' },
  // 'err_insurance_already': { 'success': false, 'error_code': '50008', 'error_message': 'Insurance is already had.' },
  'err_insurance_already': { 'success': false, 'error_code': '50008', 'error_message': 'มีรายการสั่งซื้อนี้แล้ว' },

    // Third Party 60+000
  'err_device_not_active': { 'success': false, 'error_code': '60001', 'error_message': 'Device Failed. This Device is not active.' },

    // Can not create 70+000
  'err_can_not_create_wallet': { 'success': false, 'error_code': '70001', 'error_message': 'Can Not Create Wallet' },
  'err_can_not_create_agent': { 'success': false, 'error_code': '70002', 'error_message': 'Can Not Create Agent' },

  'post_not_found': { 'success': false, 'error_code': '20000', 'error_message': 'Error, Post not found' },

  'invalid_data': { 'success': false, 'error_code': '20001', 'error_message': 'Error, กรุณากรอกข้อมูลให้ครบถ้วน' },

  'invalide_creater': { 'success': false, 'error_code': '20002', 'error_message': 'Error, คุณไม่ใช่ผู้สร้างประชุมไม่สามารถแก้ไขหรือลบได้' },


  'permission': { 'success': false, 'error_code': '60000', 'error_message': 'Error, permission deneied' }

  
}

module.exports = errorMessage
