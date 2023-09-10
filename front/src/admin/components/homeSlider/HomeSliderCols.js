import React from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FcEmptyTrash } from "react-icons/fc";
import Icon from "../../../user/components/Icon";
import axios from "axios";
import { useAlert } from "react-alert";
import noPhoto from "../../../assets/img/no-pictures1.png";

export const HomeSliderCols = [
  { Header: "Id", accessor: "id" },
  { Header: "Page", accessor: "page_name" },
  {
    filterable: false,
    Header: "Image",
    Cell: (props) => {
      let image = null;
      image = `data:image/jpg;base64,${props.row.original.image_string}`;
      if (image === null && image === undefined) {
        image = noPhoto;
      }
      return (
        <div>
          <img className="w-24 h-16 object-contain" src={image} />
        </div>
      );
    },
  },
  {
    filterable: false,
    Header: "Edit",
    Cell: (props) => {
      return (
        <Link to={`/admin/addslider/${props.row.original.id}`}>
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
            `${process.env.REACT_APP_API}/home-slider/${props.row.original.id}`,
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
