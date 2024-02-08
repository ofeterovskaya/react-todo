import React, { useState, useEffect, useCallback } from "react";
import { FaSortAlphaDown,FaSortAlphaUpAlt} from "react-icons/fa";

const initialSortOrder = localStorage.getItem("SORT_ORDER") ?? "desc";

function TodoContainer({ loading, setLoading, todoList, setTodoList }) {
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState(initialSortOrder);
    const [sortMethod, setSortMethod] = useState("view");

    const fetchData = useCallback(async (sortOrder) => {
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
            },
        };

        const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

      // Sort by Airtable view order
        const view = "Grid view";
        const viewUrl = `${url}?view=${encodeURIComponent(view)}`;

      // Sort by Airtable field
        const field = "Title";
        const fieldUrl = `${url}?sort[0][field]=${encodeURIComponent(field)}&sort[0][direction]=${sortOrder}`;

      // Choose the URL based on your sorting preference
        let sortedUrl;
        switch (sortMethod) {
            case "view":
                sortedUrl = viewUrl;
            break;
            case "field":
                sortedUrl = fieldUrl;
            break;
            case "javascript":
                sortedUrl = url;
            break;
            default:
                sortedUrl = viewUrl;
        }

        try {
            const response = await fetch(sortedUrl, options);
            const data = await response.json();

            if (data.records) {
                if (sortMethod === "javascript") {
                    data.records.sort((objectA, objectB) => {
                    const titleA = objectA.fields.title.toUpperCase();
                    const titleB = objectB.fields.title.toUpperCase();

                    if (titleA < titleB) {
                        return sortOrder === "asc" ? -1 : 1;
                    } else if (titleA > titleB) {
                        return sortOrder === "asc" ? 1 : -1;
                    } else {
                    return 0;
                    }
                });
            }

            setTodoList(
                data.records.map((record) => ({
                    title: record.fields.title,
                    id: record.id,
                }))
            );
        }

        setIsLoading(false);
    }catch (error) {
        console.error("Fetch Error:", error.message);
        setIsLoading(false);
    }
    },[sortMethod, setLoading, setTodoList]);

    useEffect(() => {
        fetchData(sortOrder);
    }, [fetchData, sortOrder]);

  // useEffect(() => {
  //     localStorage.setItem("SORT_ORDER", sortOrder)
  // }, [sortOrder])

    return (
        <div>
            <button
                style={{ color: "darkblue", fontSize: "14px" }}
                onClick={() => {
                setSortMethod("field");
                setSortOrder("asc");
                fetchData("asc");
                }}
            >
                <FaSortAlphaDown /> Sort A-Z
            </button>
            <button
                style={{ color: "darkblue", fontSize: "14px" }}
                onClick={() => {
                setSortMethod("javascript");
                setSortOrder("desc");
                fetchData("desc");
                }}>
                <FaSortAlphaUpAlt /> Sort Z-A
            </button>
        </div>
)}

export default TodoContainer;
