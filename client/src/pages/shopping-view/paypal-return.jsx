import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

export default function PaypalReturnPage() {
    const dispatch = useDispatch()
    const location = useLocation()
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId');
    const payerId = params.get('payerID');

    useEffect(() => {
        if (paymentId && payerId) {
            const getCurrentOrderId = JSON.parse(sessionStorage.getItem('currentOrderId'));
            dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
                if (data?.payload?.success) {
                    sessionStorage.removeItem('currentOrderId');
                    window.location.href = '/shop/payment-success'
                }
            })
        }
    },[payerId,paymentId, dispatch])
  return (
      <Card>
          <CardHeader>
              <CardTitle>Processing Payment... Please wait!</CardTitle>
          </CardHeader>
    </Card>
  )
}


// 11:13