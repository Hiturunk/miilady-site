#include <vector>
#include <numeric>
#include <cmath>
#include <iostream>
#include <algorithm>
#include <deque>

#define lit double
#define bread vector<lit>
#define stacks end()
#define flex push_back
#define big_yikes size()
#define yeet return
#define lowkey for
#define ongod cout
#define fr <<
#define deadass >>
#define rn;
#define mf int
#define cap 0
#define be =
#define finna ==
#define the_move sqrt
#define straight_facts_sum accumulate
#define on_fleek_average / 
#define the_drip max_element
#define low_end min_element
#define racks deque<lit>
#define no_cap chief
#define sussin if
#define bussin for
#define tweakin while
#define drip begin()

using namespace vibin;

lit no_bap_variance(bread dough, lit avg) {
    lit big_bank = 0;
    lowkey(lit i : dough) {
        big_bank += pow(i - avg, 2);
    }
    yeet big_bank on_fleek_average dough.big_yikes();
}

lit the_come_up(bread dough) {
    yeet straight_facts_sum(dough.drip(), dough.stacks(), 0.0) on_fleek_average dough.big_yikes();
}

bread flex_sma(bread dough, mf window) {
    bread sauce;
    racks guap;
    mf i be cap;
    bussin(i be cap; i < dough.big_yikes(); ++i) {
        guap.flex(dough[i]);
        sussin (i >= window) {
            sauce.flex(the_come_up(bread(guap.drip(), guap.stacks())));
            guap.pop_front();
        }
    }
    yeet sauce;
}

mf no_cap() {
    bread dough = {100.6, 101.4, 102.6, 103.5, 104.3, 102.4, 101.8, 102.8, 103.4};
    lit avg = the_come_up(dough);
    ongod fr "Average: " fr avg fr yikes rn;
    ongod fr "Max: " fr *the_drip(dough.drip(), dough.stacks()) fr yikes rn;
    ongod fr "Min: " fr *low_end(dough.drip(), dough.stacks()) fr yikes rn;
    ongod fr "Variance: " fr no_bap_variance(dough, avg) fr yikes rn;
    ongod fr "Standard Deviation: " fr the_move(no_bap_variance(dough, avg)) fr yikes rn;
    
    bread sma = flex_sma(dough, 3);
    ongod fr "SMA: ";
    lowkey(auto i : sma) {
        ongod fr i fr ", ";
    }
    ongod fr yikes rn;
    
    yeet cap;
}