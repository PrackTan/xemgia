import React from "react";
import { Card, Button } from 'antd';
import styles from "../../Styles/stylecard.module.css"
interface Props{
  index:number,
  priceorigin:number,
data :{
    duration: number;
      monthly_installment: number;
      order_diffrence_amount: number;
      order_loan_amount: number;
      order_prepay_amount: number;
      order_total_amount: number;
      real_interest_rate: number;
      processing_fee: number;
      processing_fee_per_month: number;
  }
}
export default function CardProduct(props: Props) {
  const { data,index,priceorigin } = props;
  console.log("check data card",data)
  return (
    <Card className={styles.card}>
    <div className={styles.header}>
      <span className={styles.termNumber}>{index+1}</span>
      <span>Kỳ hạn {data?.duration} tháng</span>
    </div>
  
    <div className={styles.totalPayment}>
      <h3>Tổng tiền trả góp</h3>
      <h4>{data.order_loan_amount.toLocaleString('vi-VN')} VNĐ</h4>
    </div>
    <ul className={styles.details}>
      <li>
        <span>Giá trị đơn hàng</span>
        <span>{priceorigin.toLocaleString('vi-VN')} VNĐ</span>
      </li>
      <li>
        <span>Giá trả góp</span>
        <span>{data.order_total_amount.toLocaleString('vi-VN')} VNĐ</span>
      </li>
      <li className={styles.redText}>
        <span>Góp mỗi tháng</span>
        <span>{data.monthly_installment.toLocaleString('vi-VN')} VNĐ</span>
      </li>
      <li>
        <span>Chênh lệch trả thẳng</span>
        <span>{data.order_diffrence_amount.toLocaleString('vi-VN')} VNĐ</span>
      </li>
    </ul>
    <Button type='primary' className={styles.button}>
      Chọn
    </Button>
  </Card>
  );
}
