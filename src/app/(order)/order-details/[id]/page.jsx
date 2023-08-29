const OrderDetails = ({ params, searchParams }) => {
  const { id } = params;
  const { hello } = searchParams;

  return (
    <div>{id} {hello}</div>
  );
}
 
export default OrderDetails;