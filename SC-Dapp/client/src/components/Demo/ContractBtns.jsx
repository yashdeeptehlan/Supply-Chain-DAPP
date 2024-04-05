import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue }) {
  const { state: { contract, accounts } } = useEth();
  const [priceInWei, setWeiValue] = useState("");
  const [identifier, setIdentifier] =useState("");
  const [index, setIndex] = useState("");

  

  const handleIndex = e => {
    if(/^\d+$|^$/.test(e.target.value)){
       setIndex(e.target.value);
    }
  }

  const handleStringChange = e => {
    setIdentifier(e.target.value);
  };

  const handleWeiChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setWeiValue(e.target.value);
    }
  };


  const createItem = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (priceInWei === "") {
      alert("Please enter a uint to create item.");
      return;
    }
    if (identifier === "") {
      alert("Please enter a string to create item.");
      return;
    }
    const newValue = parseInt(priceInWei);
    await contract.methods.createItem(identifier, newValue).send({ from: accounts[0] })
    .then(
      (success) => {
        console.log("Create Item: ",success);
      }
    )
    .catch(
      (error) =>{
        console.log("Create Item: error ",error);
      }
    );

  };

  async function item(payment){
    const value = await contract.methods.items(payment).call({ from: accounts[0] });
    setValue(value._item);
    return value._item;
  }

  const triggerPayment = async e => {
    if (e.target.tageName === "INPUT"){
      return;
    }
    if(index === ""){
      alert("Please enter a uint to trigger payment.");
      return;
    }
    const payment = parseInt(index);
    const anyItem = await item(payment);
    await contract.methods.triggerPayment(payment).send({ from: anyItem })
    .then(
      (success) => {
        console.log("Payment Triggered: ",success);
      }
    )
    .catch(
      (error) => {
        console.log("Payment Triggered: error ",error);
      }
    );
  }

  useEffect(() => {
    const supplyChainStepEventListener = () => {
      contract.events.SupplyChainStep({
        filter: { _step: 1 },   // listen to _step == 1 is Paid
        fromBlock: 0,
      }, (error, event) => {
        if (error) {
          console.error('SupplyChainStep Event: error', error);
        } else {
          console.log('SupplyChainStep Event:', event);
        }
      });
    };
 
    supplyChainStepEventListener();
  }, [contract]);

  return (
    <div className="btns">

      <div onClick={createItem} className="input-btn">
        Create Item(<input
          type="text"
          placeholder="string"
          value={identifier}
          onChange={handleStringChange}
        />
        <input
          type="text"
          placeholder="uint"
          value={priceInWei}
          onChange={handleWeiChange}
        />)
      </div>

      <div onClick={triggerPayment} className="input-btn">
        Trigger Payment(<input
          type="text"
          placeholder="uint"
          value={index}
          onChange={handleIndex}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
