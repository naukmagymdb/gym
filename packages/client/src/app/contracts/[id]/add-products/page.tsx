'use client';

import { apiGetFetcher } from '@/api/apiFetch';
import { editEntity } from '@/api/entity';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ProductInContractDTO } from '../../fields';

type Product = {
  goods_id: number;
  goods_name: string;
};

const productItemSchema = z.object({
  goods_id: z.number(),
  goods_name: z.string(),
  goods_amount: z.number().positive().min(1, 'Amount must be at least 1'),
});

const formSchema = z.object({
  products: z.array(productItemSchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddProductsPage() {
  const router = useRouter();
  const params = useParams();
  const contractId = params.id as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      products: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'products',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchingData(true);
        // First fetch the contract to get the supplier's edrpou and existing products
        const contract = await apiGetFetcher(`/contracts/${contractId}`);

        if (!contract || !contract.edrpou) {
          toast.error('Could not find supplier information for this contract');
          return;
        }

        // Then fetch products from that supplier
        const supplierProducts = await apiGetFetcher(
          `/suppliers/${contract.edrpou}/products`,
        );
        setProducts(supplierProducts);

        // Set existing products to the form if they exist
        if (contract.products && contract.products.length > 0) {
          // Prepare the existing products in the format needed for the form
          const existingProducts = contract.products.map(
            (product: ProductInContractDTO) => ({
              goods_id: product.goods_id,
              goods_name: product.goods_name || '',
              goods_amount: product.goods_amount,
            }),
          );

          // Replace the empty form array with the existing products
          replace(existingProducts);
        }
      } catch (error) {
        toast.error('Failed to fetch data');
        console.error(error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, [contractId, replace]);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await editEntity(
        `/contracts/${contractId}/products`,
        data.products.map((product) => ({
          goods_id: product.goods_id,
          goods_amount: product.goods_amount,
        })),
      );

      toast.success('Products updated successfully');
      router.push(`/contracts/${contractId}`);
    } catch (error) {
      toast.error('Failed to update products');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = (product: Product) => {
    const existingProductIndex = fields.findIndex(
      (field) => field.goods_id === product.goods_id,
    );

    if (existingProductIndex !== -1) {
      toast.error(`Product "${product.goods_name}" is already added`);
      return;
    }

    append({
      goods_id: product.goods_id,
      goods_name: product.goods_name,
      goods_amount: 1,
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Contract Products</h1>

      <div className="mb-6 flex flex-col gap-2">
        <Label htmlFor="product-select">Add Product</Label>
        <Select
          onValueChange={(value) => {
            const productId = parseInt(value);
            const selectedProduct = products.find(
              (product) => product.goods_id === productId,
            );
            if (selectedProduct) {
              handleAddProduct(selectedProduct);
            }
          }}
          disabled={fetchingData}
        >
          <SelectTrigger id="product-select" className="w-full">
            <SelectValue
              placeholder={
                fetchingData ? 'Loading products...' : 'Select a product'
              }
            />
          </SelectTrigger>
          <SelectContent>
            {products.length > 0 ? (
              products
                .filter(
                  (product) =>
                    !fields.some(
                      (field) => field.goods_id === product.goods_id,
                    ),
                )
                .map((product) => (
                  <SelectItem
                    key={product.goods_id}
                    value={product.goods_id.toString()}
                  >
                    {product.goods_name}
                  </SelectItem>
                ))
            ) : (
              <SelectItem value="none" disabled>
                {fetchingData ? 'Loading...' : 'No products available'}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {fields.length > 0 ? (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-4 p-4 border rounded-md"
                >
                  <div className="flex-1">
                    <p className="font-medium">{field.goods_name}</p>
                  </div>

                  <FormField
                    control={form.control}
                    name={`products.${index}.goods_amount`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            min={1}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-24 border rounded-md">
              <p className="text-gray-500">No products selected</p>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || fields.length === 0 || fetchingData}
            >
              {isLoading ? 'Saving...' : 'Save Products'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
