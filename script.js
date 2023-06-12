function check(a,x,y,v)
{
    for(let i=0;i<9;i++)
    {
        if(i!=y && a[x][i]==v)
        return false;
    }
    for(let i=0;i<9;i++)
    {
        if(i!=x && a[i][y]==v)
        return false;
    }
    let p,q,r,s;
    if(x>=0 && x<3)
    p=0,q=3;
    else if(x>=3 && x<6)
    p=3,q=6;
    else
    p=6,q=9;
    if(y>=0 && y<3)
    r=0,s=3;
    else if(y>=3 && y<6)
    r=3,s=6;
    else
    r=6,s=9;
    for(let i=p;i<q;i++)
    {
        for(let j=r;j<s;j++)
        {
            if((i!=x || j!=y) && (a[i][j]==v))
            return false;
        }
    }
    return true;
}
function backtrack(a,x,y)
{
    if(x==8 && y==8)
    {
        if(a[x][y]==0)
        {
            for(let i=1;i<=9;i++)
            {
                if(check(a,x,y,i))
                {
                    a[x][y]=i;
                    b=a;
                    return true;
                }
                a[x][y]=0;
            }
            return false;
        }
        else
        {
            b=a;
            return true;
        }
    }
    else
    {
        if(a[x][y]==0)
        {   
            for(let i=1;i<=9;i++)
            {
                if(check(a,x,y,i))
                {
                    a[x][y]=i;
                    if(y==8)
                    {
                        if(backtrack(a,x+1,0))
                        return true;
                    }
                    else
                    {
                        if(backtrack(a,x,y+1))
                        return true;
                    }
                }
                a[x][y]=0;
            }
            return false;
        }
        else
        {
            if(y==8)
            return backtrack(a,x+1,0);
            else
            return backtrack(a,x,y+1);
        }
    }
}
function solve(a)
{
    return backtrack(a,0,0);
}
function valid(a)
{
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            if(a[i][j]<0 || a[i][j]>9)
            return false;
            if(a[i][j]!=0)
            {
                if(!check(a,i,j,a[i][j]))
                return false;
            }
        }
    }
    return true;
}
let b,a=[[0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0]];

for(let i=0,p=40;i<9;i++)
{
    let q=450;
    if(i%3==0)
    p=p+3;
    for(let j=0;j<9;j++)
    {
        let x=document.createElement("INPUT");
        x.setAttribute("type","number");
        x.id=`n${i}${j}`;
        x.setAttribute("min","1");
        x.setAttribute("max","9");
        x.style.height="30px";
        x.style.position="absolute";
        if(j%3==0)
        q=q+3;
        x.style.marginLeft=`${q}px`;
        x.style.marginTop=`${p}px`;
        x.style.width="30px";
        document.body.appendChild(x);
        q=q+37;
    }
    p=p+35;
}

let resetButton=document.createElement("button");
resetButton.textContent='Reset';
resetButton.style.width="60px";
resetButton.style.height="25px";
resetButton.style.marginLeft="560px";
resetButton.style.marginTop="430px";
document.body.appendChild(resetButton);

resetButton.addEventListener('click',function ()
{
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            a[i][j]=0;
            document.getElementById(`n${i}${j}`).value="";
            document.getElementById(`n${i}${j}`).style.color="black";
        }
    }
    solveButton.disabled=false;
});

let solveButton=document.createElement("button");
solveButton.textContent="Solve";
solveButton.style.width="60px";
solveButton.style.height="25px";
solveButton.style.marginTop="430px";
solveButton.style.marginLeft="20px";
document.body.appendChild(solveButton);

solveButton.addEventListener('click',function ()
{
    for(let i=0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            let v=document.getElementById(`n${i}${j}`).value;
            if(v==="")
            a[i][j]=0;
            else
            a[i][j]=Number(v);
        }    
    }
    if(valid(a))
    {
        solve(a);
        for(let i=0;i<9;i++)
        {
            for(let j=0;j<9;j++)
            {
                let v=document.getElementById(`n${i}${j}`);
                if(v.value==="")
                {
                    v.value=b[i][j];
                    v.style.color="blue";
                }
            }
        }
        solveButton.disabled=true;
    }
    else
    alert("Incorrect input, Check!");
});