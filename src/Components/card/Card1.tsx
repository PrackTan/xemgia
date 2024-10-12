import React, { useEffect } from "react";
import { Card, Button } from "antd";
import styles from "../../Styles/stylecard.module.css";
interface Props {
  index: number;
  priceorigin: any;
  data: {
    interest: any;
    moneyofmonth: any;
    month: string;
  };
}
export default function CardProduct(props: Props) {
  const { data, index, priceorigin } = props;
  const priceoriginInt = parseInt(priceorigin);
  const dataInt = parseInt(data.interest);
  // useEffect(() => {
  //   console.log(">>>>>>>>>>>>>>", priceorigin + data.interest);
  // }, [priceorigin]);
  console.log("check data card", data);
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <span className={styles.termNumber}>{index + 1}</span>
        <span>Kỳ hạn {data?.month} tháng</span>
      </div>

      <div className={styles.totalPayment}>
        <h3>Tổng tiền trả góp</h3>
        <h4>{(priceoriginInt + dataInt).toLocaleString("vi-VN")} VNĐ</h4>
      </div>
      <ul className={styles.details}>
        <li>
          <span>Giá trị đơn hàng</span>
          <span>{priceorigin.toLocaleString("vi-VN")} VNĐ</span>
        </li>
        <li>
          <span>Giá trả góp</span>
          <span>{(priceoriginInt + dataInt).toLocaleString("vi-VN")} VNĐ</span>
        </li>
        <li className={styles.redText}>
          <span>Góp mỗi tháng</span>
          <span>{data?.moneyofmonth.toLocaleString("vi-VN")} VNĐ</span>
        </li>
        <li>
          <span>Chênh lệch trả thẳng</span>
          <span>{data.interest.toLocaleString("vi-VN")} VNĐ</span>
        </li>
      </ul>
      <Button type="primary" className={styles.button}>
        Chọn
      </Button>
    </Card>
  );
}
