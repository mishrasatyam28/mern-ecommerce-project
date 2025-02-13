import { getAllOrderForAdmin } from "@/store/admin/order-slice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import AdminOrderDetailsView from "./order-details"

const AdminOrdersView = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const { orderList, orderDetails } = useState((state) => state.adminOrder)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrderForAdmin())
  },[dispatch])
  

  return (
    <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
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
                      <Dialog
                        open={openDetailsDialog}
                        // onOpenChange={() => {
                        // setOpenDetailsDialog(false)
                        // dispatch(resetOrderDetails())
                      // }}
                      >
                        <Button
                          // onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        >
                      View Details
                      </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
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

export default AdminOrdersView

// working on handlefetchOrderDetails