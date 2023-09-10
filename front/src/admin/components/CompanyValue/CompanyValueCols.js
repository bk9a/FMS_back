import React from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FcEmptyTrash } from "react-icons/fc";
import Icon from "../../../user/components/Icon";
import axios from "axios";
import { useAlert } from "react-alert";
import noPhoto from "../../../assets/img/no-pictures1.png";

export const CompanyValueCols = [
  { Header: "Id", accessor: "id" },
  { Header: "Value", accessor: "value" },
  {
    filterable: false,
    Header: "Edit",
    Cell: (props) => {
      return (
        <Link to={`/admin/addcompanyvalue/${props.row.original.id}`}>
          <Icon size="23" color="#47A5E9" iconn={<MdEdit />} />
        </Link>
      );
    },
  },
  {
    filterable: false,
    Header: "Delete",
    Cell: (props) => {
      const alert = useAlert();

      const alertDeleteNews = () => {
        alert.show("Та өгөдлийг устгахад итгэлтэй байна уу ?", {
          closeCopy: "Буцах",
          actions: [
            {
              copy: "Тийм",
              onClick: () => deleteNews(),
            },
          ],
        });
      };

      const deleteNews = async () => {
        alert.removeAll();
        await axios
          .delete(
            `${process.env.REACT_APP_API}/company-value/${props.row.original.id}`,
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("ITSToken"),
              },
            }
          )
          .then((response) => {
            let res = response.data.success;
            if (res === true) {
              alert.show("Өгөгдөл амжилттай устгагдлаа!", {
                closeCopy: "Хаах",
              });
              props.getData();
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
      return (
        <button onClick={alertDeleteNews}>
          <Icon size="23" iconn={<FcEmptyTrash />} />
        </button>
      );
    },
  },
];
