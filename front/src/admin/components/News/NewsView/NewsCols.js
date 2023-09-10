import React from "react";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FcEmptyTrash } from "react-icons/fc";
import Icon from "../../../../user/components/Icon";
import axios from "axios";
import { useAlert } from "react-alert";
import noPhoto from "../../../../assets/img/no-pictures1.png";

export const NewsCols = [
  { Header: "Id", accessor: "id" },
  { Header: "News name", accessor: "title" },
  { Header: "Date", accessor: "date" },
  {
    filterable: false,
    Header: "Image",
    Cell: (props) => {
      let image = props.row.original.images.filter(
        (item) => item.isMainImage === true
      );
      if (image.length > 0) {
        image = `data:image/jpg;base64,${image[0].imageString}`;
      } else {
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
        <Link to={`/admin/addnews/${props.row.original.id}`}>
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
        alert.show("Та мэдээг устгахад итгэлтэй байна уу ?", {
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
            `${process.env.REACT_APP_API}/news/${props.row.original.id}`,
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("ITSToken"),
              },
            }
          )
          .then((response) => {
            let res = response.data.success;
            if (res === true) {
              alert.show("Мэдээ амжилттай устгагдлаа!", { closeCopy: "Хаах" });
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
