export const kafkaProducer = {
  producer: {
    transaction: jest.fn(() => {
      return {
        send(_: any) {return},
        commit() {return},
        abort() {return}
      }
    })
  }
}
