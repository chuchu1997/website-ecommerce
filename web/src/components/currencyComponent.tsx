/** @format */

interface CurrencyComponentProps {
  price: number;
}

const CurrencyComponent: React.FC<CurrencyComponentProps> = ({ price }) => {
  return <div>THIS IS PRICE :{price}</div>;
};

export default CurrencyComponent;
