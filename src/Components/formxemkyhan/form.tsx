"use client";
import { useEffect, useState } from "react";
import styles from "../../Styles/Home.module.css";
import Image from "next/image";
import { Input } from "antd";
interface Card {
  cardCode: string;
  cardLogo: string;
  periods: {
    duration: number;
    monthly_installment: number;
    order_diffrence_amount: number;
    order_loan_amount: number;
    order_prepay_amount: number;
    order_total_amount: number;
    real_interest_rate: number;
    processing_fee: number;
    processing_fee_per_month: number;
  }[];
}

interface Bank {
  bankName: string;
  bankCode: string;
  bankLogo: string;
  cards: Card[]; // Định nghĩa chính xác kiểu dữ liệu cho cards
}
export default function Home() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [value, ] = useState();

  // Define GraphQL query and variables
  const query = `
    query GetInstallmentInfoByCredit(
        $loan_amount: Int,
        $total_amount: Int
    ) {
        getInstallmentInfoByCredit(loan_amount: $loan_amount, total_amount: $total_amount) {
            bankCode
            bankName
            bankLogo
            cards {
                cardCode
                cardLogo
                periods {
                    duration
                    monthly_installment
                    order_diffrence_amount
                    order_loan_amount
                    order_prepay_amount
                    order_total_amount
                    real_interest_rate
                    processing_fee
                    processing_fee_per_month
                }
            }
        }
    }
  `;

  const variables = {
    loan_amount: 10000000,
    total_amount: 50000000,
  };

  // Fetch bank data via GraphQL
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch(
          "https://beta-api.bachlongmobile.com/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: query,
              variables: variables,
            }),
          }
        );

        const responseData = await response.json();
        if (responseData.data && responseData.data.getInstallmentInfoByCredit) {
          const bankData = responseData.data.getInstallmentInfoByCredit;
          setBanks(bankData); // Assuming bankData contains the correct array of banks
        } else {
          console.error("No data returned from API");
        }
      } catch (error) {
        console.error("Error fetching bank data:", error);
      }
    };

    fetchBanks();
  }, []);
  console.log(banks);
  // Handle selecting a bank
  const handleBankSelection = (bank: any) => {
    setSelectedBank(bank);
    setSelectedCard(null); // Reset card selection when a new bank is selected
  };

  // Handle selecting a card type
  const handleCardSelection = (card: any) => {
    setSelectedCard(card);
    alert(`${card} selected`);
  };
  console.log("check bank",banks)
  console.log("check select bank",selectedBank)
  console.log("check card",selectedCard)
  console.log(selectedBank);
  return (
    <div style={{ textAlign: "center", backgroundColor: "#fff897" }}>
      <h1 style={{ fontSize: 40, paddingTop: 20 }}> BẢNG TRẢ GÓP THAM KHẢO</h1>

      <div className={styles.container}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:20, gap:10}}>
          <Input
            placeholder="điền số tiền bạn muốn vay"
          />
          <button style={{backgroundColor:"#333",padding:5,borderRadius:10,color:"white"  }}>Search</button>
        </div>

        <div className={styles.grid}>
          {banks?.map((bank: any, index: any) => (
            <div
              key={index}
              className={`${styles.bankCard} ${
                selectedBank && selectedBank.bankCode === bank.bankCode
                  ? styles.selected
                  : ""
              }`}
              onClick={() => handleBankSelection(bank)}
            >
              <Image
                src={bank.bankLogo}
                alt={bank.bankName}
                className={styles.bankLogo}
                height={200}
                width={200}
              />
              {/* <p>{bank.bankName}</p> */}
            </div>
          ))}
        </div>

        {/* Chỉ hiển thị các lựa chọn thẻ thanh toán nếu đã chọn ngân hàng */}
        {selectedBank && (
          <div className={styles.paymentOptions}>
            <p>Chọn loại thẻ thanh toán cho {selectedBank?.bankName}:</p>
            <div className={styles.sub}>
              {selectedBank?.cards?.map((card: any, index: number) => (
                // Đừng quên trả về phần tử JSX từ hàm map
                <div className={styles.Imageboder} key={index}>
                  <Image
                    key={index}
                    src={card.cardLogo} // Đường dẫn logo của thẻ (từ API)
                    alt={card.cardCode}
                    className={styles.cardLogo}
                    width={100}
                    height={100}
                    onClick={() => handleCardSelection(card)} // Xử lý khi người dùng chọn thẻ
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
