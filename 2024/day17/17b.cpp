#include <iostream>
#include <string>
#include <vector>
#include <iostream>
#include <sstream>
#include <cmath>

using namespace std;

std::vector<std::string> split(std::string s, std::string delimiter) {
    size_t pos_start = 0, pos_end, delim_len = delimiter.length();
    std::string token;
    std::vector<std::string> res;
    while ((pos_end = s.find(delimiter, pos_start)) != std::string::npos) {
        token = s.substr (pos_start, pos_end - pos_start);
        pos_start = pos_end + delim_len;
        res.push_back (token);
    }
    res.push_back (s.substr (pos_start));
    return res;
}

struct
{
    unsigned long int A=0;
    unsigned long int B=0;
    unsigned long int C=0;
    unsigned char IP=(char)0;
    unsigned long int op;

    // production
    string prg = "2,4,1,5,7,5,1,6,0,3,4,2,5,5,3,0";

    // test
    // string prg = "0,3,5,4,3,0";

    vector<string> prgSp;
    vector<unsigned char> prgNums;
    vector<unsigned char> _output;
    unsigned long int initA=0;
    bool done=false;
} s;

void process(void)
{
    switch (s.prgNums[s.IP])
    {
        case 0:
            switch (s.prgNums[s.IP+1])
            {
                case 0: case 1: case 2: case 3: s.op=s.prgNums[s.IP+1]; break;
                case 4: s.op=s.A; break;
                case 5: s.op=s.B; break;
                case 6: s.op=s.C; break;
                case 7: exit(1); break;
            }
            s.A=(unsigned long int)(s.A / pow(2,(double)s.op) );
            s.IP+=2;
            break;
        case 1:
            s.B=s.B^s.prgNums[s.IP+1];
            s.IP+=2;
            break;
        case 2:
            switch (s.prgNums[s.IP+1])
            {
                case 0: case 1: case 2: case 3: s.op=s.prgNums[s.IP+1]; break;
                case 4: s.op=s.A; break;
                case 5: s.op=s.B; break;
                case 6: s.op=s.C; break;
                case 7: exit(1); break;
            }
            s.B=s.op%8;
            s.IP+=2;
            break;
        case 3:
            if (s.A==0)
            {
                s.IP+=2;
            } else
            {
                s.IP=s.prgNums[s.IP+1];
            }
            break;
        case 4:
            s.B=s.B^s.C;
            s.IP+=2;
            break;
        case 5:
            switch (s.prgNums[s.IP+1])
            {
                case 0: case 1: case 2: case 3: s.op=s.prgNums[s.IP+1]; break;
                case 4: s.op=s.A; break;
                case 5: s.op=s.B; break;
                case 6: s.op=s.C; break;
                case 7: exit(1); break;
            }
            s._output.push_back((unsigned char)(s.op%8));
            s.IP+=2;
            break;
        case 6:
            switch (s.prgNums[s.IP+1])
            {
                case 0: case 1: case 2: case 3: s.op=s.prgNums[s.IP+1]; break;
                case 4: s.op=s.A; break;
                case 5: s.op=s.B; break;
                case 6: s.op=s.C; break;
                case 7: exit(1); break;
            }
            s.B=(unsigned long int)(s.A / pow(2,(double)s.op));
            s.IP+=2;
            break;
        case 7:
            switch (s.prgNums[s.IP+1])
            {
                case 0: case 1: case 2: case 3: s.op=s.prgNums[s.IP+1]; break;
                case 4: s.op=s.A; break;
                case 5: s.op=s.B; break;
                case 6: s.op=s.C; break;
                case 7: exit(1); break;
            }
            s.C=(unsigned long int)(s.A / pow(2,(double)s.op));
            s.IP+=2;
            break;

        default:
            break;
    }

}

void dump(void)
{
    cout << endl;
    cout << "A:" << std::to_string(s.A)
        << " B:" << std::to_string(s.B)
        << " C:" << std::to_string(s.C)
        << " IP:" << std::to_string(s.IP)
        << " InitA:" << std::to_string(s.initA) << endl;
    cout << "Output:" << endl;
    for (auto x=0;x<s._output.size();++x) {
        cout << (x>0?",":"") << std::to_string(s._output[x]);
    }
    cout << endl;
}

int main(void)
{
    s.prgSp = split(s.prg, ",");
    for (auto x=0;x<s.prgSp.size();++x) {
        s.prgNums.push_back((unsigned char)atoi(s.prgSp[x].c_str()));
    }
    s.initA=372151000000;
    s.done=false;
    while (true)
    {
        if (s.initA%1000000==0)
        {
            cout << std::to_string(s.initA/1000000) << " " << std::flush;
        }

        s.A=s.initA;
        s.B=0;
        s.C=0;
        s.IP=0;
        s._output.clear();

        while (s.IP<s.prgNums.size())
        {
            process();
            if (s._output.size()>0 && s._output[s._output.size()-1]!=s.prgNums[s._output.size()-1])
            {
                s.IP=99;
                break;
            }
        }
        // dump();

        if (s.IP!=99)
        {
            if (s._output.size()==s.prgNums.size())
            {
                s.done=true;
                for (auto x=0;x<s._output.size();++x)
                {
                    if (s._output[x]!=s.prgNums[x])
                    {
                        s.done=false;
                        break;
                    }
                }
                if (s.done)
                {
                    cout << endl << "B: " << std::to_string(s.initA) << endl;
                    exit(0);
                }
            }
        }
        ++s.initA;
    }
    return 0;
}