python reggae.py "-in=./examples/domain.regex.xml" "-save=./examples/out/domain.out.txt"
python reggae.py "-in=./examples/alternations.regex.xml" "-save=./examples/out/alternations.out.txt"
python reggae.py "-in=./examples/greeting.regex.xml" "-save=./examples/out/greeting.out.txt"
python reggae.py "-in=./examples/phone-num.regex.xml" "-vars=left:3,right:4" "-save=./examples/out/phone-num.out.txt"

python reggae.py "-in=./examples/money.regex.xml" "-vars=lang:" "-save=./examples/out/money-en.out.txt"
python reggae.py "-in=./examples/money.regex.xml" "-vars=lang:de" "-save=./examples/out/money-de.out.txt"

python reggae.py "-in=./examples/name.regex.xml" "-vars=lang:" "-taste=.Net" "-save=./examples/out/name-en.out.txt"
python reggae.py "-in=./examples/name.regex.xml" "-vars=lang:de" "-taste=.Net" "-save=./examples/out/name-de.out.txt"
python reggae.py "-in=./examples/name.regex.xml" "-vars=lang:hu" "-taste=.Net" "-save=./examples/out/name-hu.out.txt"

