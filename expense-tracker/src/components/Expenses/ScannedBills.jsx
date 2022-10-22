import { ReceiptsCard } from "../MUIComponents/ScanReceipts";
import { useDataFromStore } from '../../store/state/StateProvider';
//import { actions } from "../../store/actions/actions";
import { actions } from "../../store/actions/actions";
import { useState, useEffect } from "react";
export function ShowAllBills() {

    const [{billsData}] = useDataFromStore();
    const [bills,setReceipts] = useState(billsData);
    useEffect(() => {

    }, [billsData]);

//gets each Receipt item and maps to render each item.
    return (
        <section className="container-receipts-card"> 
                    {bills.map((billsData) => (
                        <ReceiptsCard billsData={billsData} />
                    ))}
        </section>
    );
}