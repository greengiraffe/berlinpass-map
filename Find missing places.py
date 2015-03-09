import json

json_data = open('test_data.json')
data = json.load(json_data)
json_data.close()

i = 0
anb = []
for entry in data['index']:
	if not entry.has_key('coordinates'):
		i += 1
		anb.append(entry['anbieter'])

print('%i von %i Objekten haben keine Koordinaten' % (i, len(data['index'])))

f = open("anbieter_ohne_coord.txt","w")
f.write("%s\n" % "Dies sind alle Anbieter ohne Koordinaten.")
f.write("%s\n" % "-----------------------------------------")
for item in anb:
  f.write("%s\n" % item.encode('utf8'))
f.close()
