'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { CalendarIcon, Edit, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Contract } from '../contractColumns';
import { ProductInContractDTO } from '../fields';

export default function ContractPage() {
  const params = useParams();
  const contractId = params.id as string;
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setLoading(true);
        const data = await apiGetFetcher(`/contracts/${contractId}`);
        setContract(data);
      } catch (error) {
        toast.error('Failed to load contract details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [contractId]);

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-muted-foreground">
            Loading contract details...
          </p>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-lg text-muted-foreground">Contract not found</p>
          <Button asChild>
            <Link href="/contracts">Back to Contracts</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = contract.contract_date
    ? format(new Date(contract.contract_date), 'PPP')
    : 'Not specified';

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Contract #{contract.contract_num}
        </h1>
        <Button asChild variant="outline">
          <Link href="/contracts">Back to Contracts</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contract Details</CardTitle>
            <CardDescription>
              Basic information about this contract
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="text-sm font-medium text-muted-foreground">
                Contract Number
              </div>
              <div className="text-sm">{contract.contract_num}</div>

              <div className="text-sm font-medium text-muted-foreground">
                Supplier EDRPOU
              </div>
              <div className="text-sm">{contract.edrpou}</div>

              <div className="text-sm font-medium text-muted-foreground">
                Total Sum
              </div>
              <div className="text-sm font-semibold">
                {contract.total_sum.toLocaleString()} ₴
              </div>

              <div className="text-sm font-medium text-muted-foreground">
                Date
              </div>
              <div className="text-sm flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                {formattedDate}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href={`/contracts/${contractId}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Contract
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Products included in this contract
              </CardDescription>
            </div>
            <Button asChild size="sm">
              <Link href={`/contracts/${contractId}/add-products`}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Products
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {contract.products && contract.products.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contract.products.map((product: ProductInContractDTO) => (
                    <TableRow key={product.goods_id}>
                      <TableCell className="font-medium">
                        {product.goods_name}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.goods_price.toLocaleString()} ₴
                      </TableCell>
                      <TableCell className="text-right">
                        {product.goods_amount}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {product.total_goods_price?.toLocaleString() || 'N/A'} ₴
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center h-36 text-muted-foreground">
                <p>No products added to this contract</p>
                <p className="text-sm">
                  Use the Add Products button to add some
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <div className="text-sm font-medium text-muted-foreground">
              Total
            </div>
            <div className="text-lg font-bold">
              {contract.total_sum.toLocaleString()} ₴
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
