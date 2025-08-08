import { body, validationResult } from 'express-validator';

const validateRecruitment = [
  body('name').notEmpty().withMessage('Tên không được để trống'),
  body('email').notEmpty().withMessage('Email không được để trống'),
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('phone').optional({checkFalsy: true}).isMobilePhone('vi-VN').withMessage('Số điện thoại không hợp lệ'),
  body('title').notEmpty().withMessage('Tiêu đề không được để trống'),
  body('content').notEmpty().withMessage('Nội dung không được để trống'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {  
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: errors.array()
      });
    }
    next();
  }
];

const validateContact = [
  body('name').notEmpty().withMessage('Tên không được để trống'),
  body('email').notEmpty().withMessage('Email không được để trống'),
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('phone').optional({checkFalsy: true}).isMobilePhone('vi-VN').withMessage('Số điện thoại không hợp lệ'),
  body('title').notEmpty().withMessage('Tiêu đề không được để trống'),
  body('content').notEmpty().withMessage('Nội dung không được để trống'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: errors.array()
      });
    }
    next();
  }
];
export default {validateRecruitment, validateContact};
