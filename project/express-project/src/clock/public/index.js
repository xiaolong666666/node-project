
      window.onload = function () {
        const time = document.querySelector("#time");

        function updateTime() {
          time.innerHTML = new Date().toLocaleTimeString();
        }

        updateTime();
        setInterval(updateTime, 1000);
      };
    