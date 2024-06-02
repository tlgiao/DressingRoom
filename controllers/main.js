$(document).ready(function () {
  const callData = new CallData();
  const listChosen = new ListChosen();
  renderHTML();

  function renderHTML() {
    callData
      .getListData()
      .done(function (result) {
        let contentNavpills = "";
        let contentTabpane = "";
        result.navPills.forEach((item, index) => {
          const activeClass = item.tabName === "tabTopClothes" ? "active" : "";
          const fadeClass = item.tabName !== "tabTopClothes" ? "fade" : "";
          contentNavpills += getElementTabPills(item, activeClass);
          contentTabpane += `
          <div class="tab-pane container ${fadeClass} ${activeClass}" id=${
            item.tabName
          }>
         
                <div class="row">
                 ${renderTabPane(item.tabName, result.tabPanes)}
                </div>
              
            </div>
          `;
          $(".nav-pills").html(contentNavpills);
          $(".tab-content").html(contentTabpane);
        });
      })
      .fail(function (error) {
        console.log("🚀error---->", error);
      });
  }

  function getElementTabPills(item, activeClass) {
    return `
    <li class="nav-item">
    <a class="nav-link  ${activeClass}  btn-default" data-toggle="pill" href="#${item.tabName}">${item.showName}</a>
    </li>
  `;
  }

  function getTypeArr(tabType, data) {
    const tempArr = [];
    data.forEach((item) => {
      if (item.type === tabType) {
        tempArr.push(item);
      }
    });
    return tempArr;
  }

  function getElementItem(tempArr) {
    let elementItem = "";
    tempArr.forEach((item) => {
      console.log("🚀item---->", item.imgSrc_png);
      elementItem += `
 <div class="col-md-3">
 <div class="card text-center">
   <img src=${item.imgSrc_jpg} />
   <h4><b>${item.name}</b></h4>
   <button
   data-id="${item.id}"
   data-type="${item.type}"
   data-name="${item.name}"
   data-desc="${item.desc}"
   data-img="${item.imgSrc_jpg}"
   data-imgpng="${item.imgSrc_png}"
   class="changeStyle">Thử đồ</button>
 </div>
</div>
 `;
    });
    return elementItem;
  }

  function renderTabPane(tabName, arrTabPane) {
    let tempArr = null;
    let elementItem = null;

    switch (tabName) {
      case "tabTopClothes": {
        tempArr = getTypeArr("topclothes", arrTabPane);
        elementItem = getElementItem(tempArr);
        break;
      }
      case "tabBotClothes": {
        tempArr = getTypeArr("botclothes", arrTabPane);
        elementItem = getElementItem(tempArr);
        break;
      }
      case "tabShoes": {
        tempArr = getTypeArr("shoes", arrTabPane);
        elementItem = getElementItem(tempArr);
        break;
      }
      case "tabHandBags": {
        tempArr = getTypeArr("handbags", arrTabPane);
        elementItem = getElementItem(tempArr);
        break;
      }
      case "tabNecklaces": {
        tempArr = getTypeArr("necklaces", arrTabPane);
        elementItem = getElementItem(tempArr);
        break;
      }
      case "tabHairStyle": {
        tempArr = getTypeArr("hairstyle", arrTabPane);
        elementItem = getElementItem(tempArr);
        break;
      }

      default:
        tempArr = getTypeArr("background", arrTabPane);
        elementItem = getElementItem(tempArr);
    }
    return elementItem;
  }

  function findIndex(type) {
    let index = -1;
    if (listChosen.arr) {
      listChosen.arr.forEach((item, i) => {
        if (item.type === type) index = i;
      });
    }
    return index;
  }

  $("body").delegate(".changeStyle", "click", function () {
    const id = $(this).data("id");
    console.log("🚀id---->", id);
    const type = $(this).data("type");
    const name = $(this).data("name");
    const desc = $(this).data("desc");
    const img = $(this).data("img");
    const imgPng = $(this).data("imgpng");
    console.log("🚀img---->", imgPng);

    const choseItem = new ChoseItem(id, type, name, desc, img, imgPng);

    const index = findIndex(choseItem.type);
    if (index !== -1) {
      //update
      listChosen.arr[index] = choseItem;
    } else {
      //add
      listChosen.addItem(choseItem);
    }

    renderContainer(listChosen.arr);
  });

  function renderContainer(chosenItem) {
    if (chosenItem && chosenItem.length > 0) {
      chosenItem.forEach(function (item) {
        if (item.type === "topclothes") {
          renderBikiniTop(item.imgPng);
        }
        if (item.type === "botclothes") {
          renderBikiniBot(item.imgPng);
        }
        if (item.type === "shoes") {
          renderShoes(item.imgPng);
        }
        if (item.type === "handbags") {
          renderHandbag(item.imgPng);
        }
        if (item.type === "necklaces") {
          renderNecklaces(item.imgPng);
        }
        if (item.type === "hairstyle") {
          renderHairstyle(item.imgPng);
        }
        if (item.type === "background") {
          renderBackground(item.imgPng);
        }
      });
    }
  }

  function renderBackground(img) {
    $(".background").css({
      backgroundImage: `url(${img})`,
    });
  }

  function renderHairstyle(img) {
    $(".hairstyle").css({
      width: "1000px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      top: "-75%",
      right: "-57%",
      transform: "scale(0.15)",
      zIndex: "4",
    });
  }

  function renderNecklaces(img) {
    $(".necklace").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-40%",
      right: "-3.5%",
      transform: "scale(0.5)",
      zIndex: "4",
    });
  }

  function renderHandbag(img) {
    $(".handbag").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-40%",
      right: "-3.5%",
      transform: "scale(0.5)",
      zIndex: "4",
    });
  }

  function renderShoes(img) {
    $(".feet").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      bottom: "-37%",
      right: "-3.5%",
      transform: "scale(0.5)",
      zIndex: "1",
    });
  }

  function renderBikiniTop(img) {
    $(".bikinitop").css({
      width: "500px",
      height: "500px",
      background: `url(${img})`,
      position: "absolute",
      top: "-9%",
      left: "-5%",
      zIndex: "3",
      transform: "scale(0.5)",
    });
  }

  function renderBikiniBot(img) {
    $(".bikinibottom").css({
      width: "500px",
      height: "1000px",
      background: `url(${img})`,
      position: "absolute",
      top: "-30%",
      left: "-5%",
      zIndex: "2",
      transform: "scale(0.5)",
    });
  }
});
