const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');



btn.addEventListener('click', async ()=>{
    console.log('cliked');
    
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    
    console.log(tab);
    chrome.scripting.executeScript(
        {
            target: {tabId: tab.id},
            function: pickColor,
        },
        async(injectionResults)=>{
            const [data] = injectionResults;
            if(data.result){
                const color = data.result.sRGBHex;
                colorGrid.style.backgroundColor = color;
                colorValue.innerText = color;
                try{
                    await navigator.clipboard.writeText(color);
                }catch(err){
                    console.log(err);
                }
            }
        }
    );
});

async function pickColor(){
    console.log('script working');
    try{
        // picker
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
        // console.log(selecterColor);
    }catch(err){
        console.log(err);
    }
};