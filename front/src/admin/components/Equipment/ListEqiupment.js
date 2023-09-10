import React, { useEffect, useState } from "react";
import { EquipmentCols } from "./EquipmentCols";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../Button";
import TableTemp from "../TableTemp";

const IntialData = {
  data: [],
  loading: false,
};

const ListEqiupment = () => {
  const [state, setState] = useState(IntialData);
  let [pageNum, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagin, setPagin] = useState({});

  useEffect(() => {
    getData();
  }, [pageNum]);

  useEffect(() => {
    setPage(1);
  }, []);

  const getData = async () => {
    setState({ loading: true });
    await axios
      .get(
        `${process.env.REACT_APP_API}/equipment?page=${pageNum}&limit=${limit}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("ITSToken"),
          },
        }
      )
      .then((response) => {
        let res = response.data.data;
        setState({ data: res, loading: false });
        setPagin(response.data.pagination);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const next = () => {
    if (pageNum < pagin.pageCount) {
      setPage(++pageNum);
    }
  };
  const prev = () => {
    if (pageNum > 1) {
      setPage(--pageNum);
    }
  };

  return (
    <div className="pt-4 space-y-4">
      <Link className="pl-4 inline-block relative" to="/admin/addequipment">
        <Button name="Өгөгдөл оруулах" />
      </Link>
      {state && state.data && state.data.length > 0 ? (
        <TableTemp
          Cols={EquipmentCols}
          Data={state.data}
          getData={getData}
          next={next}
          prev={prev}
          pagination={pagin}
          page={pageNum}
        />
      ) : (
        <p className="pl-4 flex justify-start items-center text-sky-600 text-2xl">
          Түр хүлээнэ үү!
        </p>
      )}
    </div>
  );
};

export default ListEqiupment;
