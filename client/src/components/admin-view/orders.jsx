import { getAllOrderForAdmin } from "@/store/admin/order-slice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
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
  },[])
  
// 11:54
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
                  <TableRow>
                    <TableCell>123456</TableCell>
                    <TableCell>27/06/2024</TableCell>
                    <TableCell>In Progress</TableCell>
                    <TableCell>$1000</TableCell>
                    <TableCell>
                  <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>

                  
                <Button onClick={()=>setOpenDetailsDialog(true)}>
                        View Details
                  </Button>
                  <AdminOrderDetailsView/>
                  </Dialog>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
    </Card>
  )
}

export default AdminOrdersView