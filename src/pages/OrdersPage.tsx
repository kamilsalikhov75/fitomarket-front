/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { getOrders, useOrders } from "../effector/orders/ordersStore";
import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import dayjs from "dayjs";

export const OrdersPage = () => {
  const { loading, orders } = useOrders();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <h1 className="text-2xl text-secondary font-bold">Заказы</h1>
      {loading && <div>Загрузка...</div>}
      {!loading && orders?.length === 0 && <div>Заказов нет</div>}
      {!loading && orders?.length !== undefined && orders?.length > 0 && (
        <Accordion variant="shadow">
          {orders.map((order) => {
            const { products } = order;

            return (
              <AccordionItem
                key={order._id}
                title={
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <span>
                        Дата: {dayjs(order.createdAt).format("DD.MM.YYYY")}
                      </span>
                      <span>
                        Время: {dayjs(order.createdAt).format("HH:mm")}
                      </span>
                      <span>Сумма: {order.price} ₽</span>
                    </div>
                    <span>Адрес: {order.address}</span>
                  </div>
                }
              >
                {products.map((product: any) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between"
                  >
                    <Image
                      src={`${import.meta.env.VITE_API_URL}${product.imageUrl}`}
                      width={60}
                    />
                    <span>{product.title}</span>
                    <span>
                      {product.price}₽ x {product.count} шт. ={" "}
                      {product.price * product.count} ₽
                    </span>
                  </div>
                ))}
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </>
  );
};
