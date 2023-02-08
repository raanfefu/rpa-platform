 
class csvLibrary(object):

    def read_csv_file(self, filename): 
        data = []
        with open(filename, 'rb') as csvfile:
            for row in csvfile:
                data.append(row.decode("utf-8"))
        return data