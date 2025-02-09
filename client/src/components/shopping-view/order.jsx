import { getAllOrderByUserId, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice"
import { Dialog } from "@radix-ui/react-dialog"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { ShoppingOrderDetailsView } from "./order-details"

const ShoppingOrders = () => {
  

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)
  const { orderList, orderDetails } = useSelector(state => state.auth)

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId))
  }
  
  useEffect(() => {
    dispatch(getAllOrderByUserId(user?.id))
  }, [dispatch])
  
  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true)
    }
  },[orderDetails])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Histroy</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            { 
              orderList && orderList.length > 0 ?
                orderList.map(orderItem =>
                  <TableRow>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                    <TableCell>
                      <Badge className={`py-1 px-3 ${orderItem?.orderStatus === 'confirmed' ? 'bg-yellow-600' : 'bg-black'}`}>
                      {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{orderItem?.totalAmount}</TableCell>
                  <TableCell>
                      <Dialog open={openDetailsDialog} onOpenChange={() => {
                        setOpenDetailsDialog(false)
                        dispatch(resetOrderDetails())
                    }}>
                        <Button onClick={()=>handleFetchOrderDetails(orderItem?._id)}>
                      View Details
                      </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                  </TableCell>
                </TableRow>
              ):null
            }
            
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders
// 11:31