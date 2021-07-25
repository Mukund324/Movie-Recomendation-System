import uuid
from sqlalchemy.orm import declarative_base
from sqlalchemy import String, Column, Integer
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from  sqlalchemy.sql.expression import func, select

Base = declarative_base()
engine = create_engine('sqlite:///imdb.db', echo=True)
Session = sessionmaker(bind=engine)
session = Session()


class ImdbIds(Base):
    __tablename__ = 'IMDB_IDs'

    id = Column(Integer, primary_key=True)
    imdb_id = Column(String)

    def __repr__(self):
        return f"{self.imdb_id}"

def add_id(im_id):
    record = ImdbIds(imdb_id=im_id)
    session.add(record)
    session.commit()

# def get_machine(uid):
#     if uid.startswith('ip'):
#         query = uid[2:]
#         machine = session.query(Machines).filter_by(ip_addr=query).first()
#     else:
#         machine = session.query(Machines).filter_by(id=uid).first()
#     return machine

def get_id():
    return session.query(ImdbIds).order_by(func.random()).first()