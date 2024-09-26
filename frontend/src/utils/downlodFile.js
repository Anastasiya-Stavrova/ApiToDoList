const downloadFile = (json_data) => {
    var date = new Date();

    const fileName = `TaskList ${date.toString()}.json`;
    const data = new Blob([JSON.stringify(json_data)], { type: "text/json" });
    const jsonURL = window.URL.createObjectURL(data);

    const link = document.createElement("a");
    document.body.appendChild(link);

    link.href = jsonURL;
    link.setAttribute("download", fileName);
    link.click();

    document.body.removeChild(link);
}
 
export default downloadFile;