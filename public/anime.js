function animate(){
    const bubblesA = new mojs.Burst({
        count:20,
        radius: {0: 380},
        children: {
            color: 'green',
            shape: 'circle',
            radius: {50: 5},
            duration: 1000,
            stroke: 'teal'
        }
    });
    const bubblesB = new mojs.Burst({
        count:30,
        radius: {0: 300},
        children: {
            shape: 'cross',
            stroke: 'magenta',
            color:'blue',
            radius: {100: 10},
            duration: 1500
        }
    });
    const circle=new mojs.Shape({
        radius:{100:300},
        fill: 'none',
        stroke:'white',
        strokeWidth:{20:5},
        duration:2000,
        opacity:{1:0.3}
    });
    
    const tm = new mojs.Timeline({
        repeat:0
    })
    .add(bubblesA, bubblesB, circle)
    .play();
}