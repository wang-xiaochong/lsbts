
async function printInfo() {

    console.log(JSON.parse(window.sessionStorage.getItem('userInfo')))

}

export var Home = <>
    <div>
        Home
        <button onClick={printInfo}>Info</button>
    </div>
</>
