#include <iostream>
#include <algorithm>
#include <vector>
#include <stack>
#include <cmath>
#include <string>
using namespace std;

__int128 in(string s)
{
    __int128 temp=0;
    for(char c:s)
    {
	temp*=10;
	temp+=(c-'0');
    }
    return temp;
}

void out(__int128 x)
{
    stack<char>s;
    while(x)
    {
	s.push((x%10 +'0'));
	x/=10;
    }
    while(!s.empty())
    {
	cout<<s.top();
	s.pop();
    }
}

__int128 fun(__int128 a, __int128 b, __int128 mod)
{
    return (a*a+b)%mod+1;
}

__int128 pollard_rho(__int128 num, __int128 comp)
{
    if(num==1) return 1;
    if(num%2 == 0) return 2;

    srand(time(0));
    __int128 y=rand()%num+1,c=rand()%num+1, x, gcd=1, sq=sqrt(num)+100;
    x=y;

    int count=0;

    while(gcd==1)
    {
	if(count >= sq) return num;
	count++;
	x=fun(x, c, num);
	y=fun( fun(y, c, num), c, num );
	if(x==y) gcd=num;
	else	gcd=__gcd(abs(x-y), num);
	if(gcd!=1)
	{
	    if(gcd==num || gcd==comp)
	    {
		y=rand()%num+1;
		x=y;
		gcd=1;
	    }
	    else
	    {
		break;
	    }
	}  
    }

    return gcd;
}

__int128 modexp(__int128 base, __int128 power, __int128 mod=1000000007)
{
    __int128 res=1;
    while(power)
    {
	if(power&1) res=(res*base)%mod;
	power>>=1;
	base=(base*base)%mod;
    }
    return res;
}


bool miller_rabin(__int128 num, __int128 k)
{
    __int128 s=0,d=num-1,one=1,temp;
    while(!(d&1)) d>>=1,s++;

    bool flag=true;
    temp=modexp(k,d,num);
    if(temp==1 || temp==num-1) return 1;
    for(int i=0;i<s;i++)
    {
	temp=(temp*temp)%num;
	if(temp==1) return 0;
	if(temp==num-1) return 1;
    }
    return 0;
}

bool prime(__int128 num)
{
    vector<int>A{2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67};
    for(auto x:A) if(x==num) return 1;
    if(!(num&1)) return 0;

    bool flag=true;
    for(auto x:A) flag&=miller_rabin(num, x);
    return flag;
}

void prime_factorization(__int128 x)
{
    if(x==0) return;

    vector< pair<__int128, int> >factor;

    while(x!=1)
    {
	__int128 y=pollard_rho(x,0);
	int count=1;
	while(!prime(y)) y=pollard_rho(y,y);
	x/=y;
	while(x%y==0)
	{
	    x/=y;
	    count++;
	}
	factor.push_back({y,count});
    }
    sort(factor.begin(),factor.end());
    for(auto o: factor)
    {
	out(o.first);
	cout<<" ";
    }
    cout<<"\n";
}

int main(int argc, char** argv){
    if (argc >= 2) {
	     prime_factorization(in(argv[1]));
     }
     return 0;
}