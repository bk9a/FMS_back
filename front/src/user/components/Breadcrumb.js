import React from "react";
import { BreadcrumbStore } from "../../assets/store/BreadcrumbStore";
import { Link } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import Icon from "./Icon";

const Breadcrumb = (props) => {
  const history = props.history;
  const data = BreadcrumbStore;

  const getName = (url) => {
    if (url === "") {
      return null;
    }
    const item = data.filter((item) => item.url === url)[0];
    return item.name;
  };

  return (
    <div className="w-full h-12 bg-slate-100">
      <div className="w-full h-full container flex items-center text-slate-600">
        {history.map((item, index) => {
          return (
            <div className="flex items-center" key={"breadcrumb-" + index}>
              <Link to={`/user/${index === 1 ? "home" : item}`}>
                <span className="text-[14.5px]">{getName(item)}</span>
              </Link>
              {history[index + 1] && index !== 0 ? (
                <Icon
                  styles="flex items-center mx-1.5"
                  size="17"
                  color="475569"
                  iconn={<MdNavigateNext style={{ marginTop: 2 }} />}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
